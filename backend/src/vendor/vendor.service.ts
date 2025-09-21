import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { GenerateBadgeDto } from './dto/generate-badge.dto';

@Injectable()
export class VendorService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async generateBadgeScript(vendorId: number) {
    
    // Get vendor information
    const vendor = await this.prisma.user.findUnique({
      where: { id: vendorId, utype: 'VENDOR' },
      select: {
        id: true,
        name: true,
        company: true,
        companyLogo: true,
        packageActive: true,
        status: true,
        zipcodes: {
          select: {
            zipcode: true
          },
          take: 1
        },
        vendorType: true
      },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    // Always show as appreciated (hardcoded)
    const isCertified = true;

    const frontendUrl = this.configService.get('FRONTEND_URL') || 'https://coreaeration.com';
    const backendUrl = this.configService.get('BACKEND_URL') || 'https://coreaeration.com/backend';
    const appName = this.configService.get('APPNAME') || 'Core Aeration';
    
    // Use the existing logo from public/uploads/logo.png
    const logoUrl = `${backendUrl}/public/uploads/logo.png`;
    
    // Get a zipcode for the search URL, fallback to empty string if none available
    const zipcode = vendor.zipcodes && vendor.zipcodes.length > 0 ? vendor.zipcodes[0].zipcode : '';
    const searchUrl = zipcode ? `${frontendUrl}/search-vendors?search=${zipcode}` : `${frontendUrl}/vendor-search`;
    
    // Determine which SVG to show based on vendorType
    const svgFile = vendor.vendorType === 'RENTAL' ? '3.png' : 
                    vendor.vendorType === 'SALES' ? '2.png' : '1.png';
    const svgUrl = `${backendUrl}/public/uploads/${svgFile}`;
    console.log("first svgUrl",svgUrl)
    
    // Generate unique widget ID for this vendor
    const widgetId = `core-aeration-badge-${vendor.id}`;
    
    // Create the JavaScript widget script
    const widgetScript = `
    <script>
(function() {
  // Core Aeration Certificate Vendor Badge Widget
  var widgetId = '${widgetId}';
  var vendorData = {
    id: ${vendor.id},
    name: '${(vendor.name || '').replace(/'/g, "\'")}',
    appName: '${appName}',
    company: '${appName}',
    logo: '${logoUrl}',
    certified: ${isCertified},
    frontendUrl: '${frontendUrl}',
  };

  function createBadgeWidget() {
    // Check if widget already exists
    if (document.getElementById(widgetId)) {
      return;
    }

    // Create widget container
    var widget = document.createElement('div');
    widget.id = widgetId;
    widget.style.cssText = \`
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 280px;
      background: linear-gradient(135deg, #a0b830 0%, #8fa329 100%);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 10000;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid rgba(255, 255, 255, 0.2);
    \`;

    // Create badge content
    var badgeContent = \`
      <div style="padding: 16px; color: white;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          ">
            \${vendorData.logo ? 
              \`<img src="\${vendorData.logo}" alt="Logo" style="width: 32px; height: 32px; object-fit: cover; border-radius: 4px;">\` : 
              \`<svg width="24" height="24" fill="#a0b830" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/></svg>\`
            }
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${appName} Badge
            </div>
            <div style="font-size: 12px; opacity: 0.9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              \${vendorData.company || vendorData.name}
            </div>
          </div>
          \${vendorData.certified ? 
            \`<div style="
              width: 20px;
              height: 20px;
              background: #22c55e;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            ">
              <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>\` : 
            \`<div style="
              width: 20px;
              height: 20px;
              background: #ef4444;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            ">
              <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </div>\`
          }
        </div>
        <div style="
          font-size: 11px;
          opacity: 0.8;
          text-align: center;
          padding-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        ">
          \${vendorData.certified ? '${appName} Vendor' : 'Thank You'}
        </div>
      </div>
    \`;

    widget.innerHTML = badgeContent;

    // Add hover effects
    widget.addEventListener('mouseenter', function() {
      widget.style.transform = 'translateY(-2px)';
      widget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
    });

    widget.addEventListener('mouseleave', function() {
      widget.style.transform = 'translateY(0)';
      widget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
    });

    // Add click handler to open vendor profile
    widget.addEventListener('click', function() {
      window.open(vendorData.frontendUrl + '/vendors/', '_blank');
    });

    // Append to body
    document.body.appendChild(widget);
  }

  // Initialize widget when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBadgeWidget);
  } else {
    createBadgeWidget();
  }
})();
</script>
`;

    const result = {
      success: true,
      message: 'Badge script generated successfully',
      data: {
        script: widgetScript,
        badgeData: {
          badgeHtml: `<div onclick="window.open('${searchUrl}', '_blank')" style="width: 120px; height: 120px;flex-shrink: 0; object-fit: cover;"
     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'"
     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
     
    <img src="${svgUrl}" 
         alt="Core Aeration Certified Vendor" 
         style="width: 110px; 
                height: 110px; 
                border-radius: 6px; 
                flex-shrink: 0;
                object-fit: cover;" />
                
    
    
    
</div>`,
          imageHtml: `<div onclick="window.open('${searchUrl}', '_blank')" style="width: 120px; height: 120px;flex-shrink: 0; object-fit: cover;" 
     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'"
     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
     
    <img src="${svgUrl}" 
         alt="Core Aeration Certified Vendor" 
         style="width: 110px; 
                height: 110px; 
                border-radius: 6px; 
                flex-shrink: 0;
                object-fit: cover;" />
     
</div>`,
          previewUrl: `${searchUrl}`,
          badgeType: 'Vendor Services',
        },
        badgeInstructions: {
          title: 'How to Use Your Certificate Badge',
          steps: [
            'Copy the HTML code below',
            'Paste it anywhere in your website HTML where you want the badge to appear',
            'The badge will display as a professional certification badge with hover effects',
            'Visitors can click the badge to search for vendors in your area'
          ],
          notes: [
            'The badge includes hover animations and professional styling',
            'Shows your certified vendor status with modern design',
            'Automatically uses the correct SVG icon based on your vendor type',
            'Perfect for sidebars, footers, or any prominent location'
          ]
        },
        widgetId,
        vendor: {
          id: vendor.id,
          name: vendor.name,
          company: vendor.company,
          certified: isCertified,
        },
        instructions: {
          title: 'How to Install Your Appreciation Badge',
          steps: [
            'Copy the JavaScript code below',
            'Paste it before the closing </body> tag in your website HTML',
            'The badge will automatically appear in the bottom-right corner of your website',
            'Visitors can click the badge to view your vendor profile'
          ],
          notes: [
            'The badge is responsive and will work on all devices',
            'Shows appreciation for your partnership',
            'The badge design matches your company branding when possible'
          ]
        }
      },
    };
    
    return result;
  }

  async customizeBadge(vendorId: number, customizeDto: GenerateBadgeDto) {
    // Get vendor information including vendorType and zipcodes
    const vendor = await this.prisma.user.findUnique({
      where: { id: vendorId, utype: 'VENDOR' },
      select: {
        id: true,
        name: true,
        company: true,
        companyLogo: true,
        packageActive: true,
        status: true,
        vendorType: true,
        zipcodes: {
          select: {
            zipcode: true
          },
          take: 1
        }
      },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    // Always show as appreciated (hardcoded)
    const isCertified = true;

    const frontendUrl = this.configService.get('FRONTEND_URL') || 'https://coreaeration.com';
    const backendUrl = this.configService.get('BACKEND_URL') || 'https://coreaeration.com/backend';
    const appName = this.configService.get('APPNAME') || 'Core Aeration';
    
    // Get a zipcode for the search URL, fallback to empty string if none available
    const zipcode = vendor.zipcodes && vendor.zipcodes.length > 0 ? vendor.zipcodes[0].zipcode : '';
    const searchUrl = zipcode ? `${frontendUrl}/vendor-search?search=${zipcode}` : `${frontendUrl}/vendors/`;
    console.log("first zipcode",zipcode)
    // Use the existing logo from public/uploads/logo.png
    const logoUrl = `${backendUrl}/public/uploads/logo.png`;
    
    // Generate unique widget ID for this vendor
    const widgetId = `core-aeration-badge-${vendor.id}`;
    
    // Determine position CSS based on customizeDto
    const getPositionCSS = (position: string) => {
      switch (position) {
        case 'BOTTOM_LEFT':
          return 'bottom: 20px; left: 20px;';
        case 'BOTTOM_CENTER':
          return 'bottom: 20px; left: 50%; transform: translateX(-50%);';
        case 'TOP_RIGHT':
          return 'top: 20px; right: 20px;';
        case 'TOP_LEFT':
          return 'top: 20px; left: 20px;';
        default:
          return 'bottom: 20px; right: 20px;';
      }
    };

    // Determine size CSS based on customizeDto
    const getSizeCSS = (size: string) => {
      switch (size) {
        case 'SMALL':
          return 'width: 200px;';
        case 'LARGE':
          return 'width: 320px;';
        default:
          return 'width: 280px;';
      }
    };

    // Build the logo HTML conditionally
    const logoHtml = customizeDto.showLogo !== false ? `
      <div >
        \${vendorData.logo ? 
          \`<img src="\${vendorData.logo}" alt="Logo" style="width: 32px; height: 32px; object-fit: cover; border-radius: 4px;">\` : 
          \`<svg width="24" height="24" fill="#a0b830" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/></svg>\`
        }
      </div>
    ` : '';

    // Build the appreciation status HTML conditionally
    const appreciationHtml = customizeDto.showAppreciationStatus !== false ? `
      \${vendorData.certified ? 
        \`<div>
          <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>\` : 
        \`<div style="
          width: 20px;
          height: 20px;
          background: #ef4444;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        ">
          <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </div>\`
      }
    ` : '';

    // Build the footer HTML conditionally
    const footerHtml = customizeDto.showAppreciationStatus !== false ? `
      <div style="
        font-size: 11px;
        opacity: 0.8;
        text-align: center;
        padding-top: 8px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
      ">
        \${vendorData.certified ? 'Certified Vendor' : 'Thank You'}
      </div>
    ` : '';
    
    // Create the JavaScript widget script
    const customizeScript = `
    <script>
(function() {
  // Core Aeration Certificate Vendor Badge Widget
  var widgetId = '${widgetId}';
  var vendorData = {
    id: ${vendor.id},
    name: '${(vendor.name || '').replace(/'/g, "\\'")}',
    appName: '${appName}',
    company: '${appName}',
    logo: '${logoUrl}',
    certified: ${isCertified},
    frontendUrl: '${searchUrl}',
  };

  function createBadgeWidget() {
    // Check if widget already exists
    if (document.getElementById(widgetId)) {
      return;
    }

    // Create widget container
    var widget = document.createElement('div');
    widget.id = widgetId;
    widget.style.cssText = \`
      position: fixed;
      ${getPositionCSS(customizeDto.position || 'BOTTOM_RIGHT')}
      ${getSizeCSS(customizeDto.size || 'MEDIUM')}
      background: linear-gradient(135deg, #a0b830 0%, #8fa329 100%);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 10000;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid rgba(255, 255, 255, 0.2);
    \`;

    // Create badge content
    var badgeContent = \`
      <div style="padding: 16px; color: white;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          ${logoHtml}
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              Certified Vendor
            </div>
            <div style="font-size: 12px; opacity: 0.9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              \${vendorData.company || vendorData.name}
            </div>
          </div>
          ${appreciationHtml}
        </div>
        ${footerHtml}
      </div>
    \`;

    widget.innerHTML = badgeContent;

    // Add hover effects
    widget.addEventListener('mouseenter', function() {
      widget.style.transform = 'translateY(-2px)';
      widget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
    });

    widget.addEventListener('mouseleave', function() {
      widget.style.transform = 'translateY(0)';
      widget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
    });

    // Add click handler to open vendor profile
    widget.addEventListener('click', function() {
      window.open(vendorData.frontendUrl, '_blank');
    });

    // Append to body
    document.body.appendChild(widget);
  }

  // Initialize widget when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBadgeWidget);
  } else {
    createBadgeWidget();
  }
})();
</script>
`;

    // Generate iframe badge based on vendor type
    const svgFile = vendor.vendorType === 'RENTAL' ? '2.svg' : 
                    vendor.vendorType === 'SALES' ? '3.svg' : '1.svg';
    const badgeType = vendor.vendorType === 'RENTAL' ? 'Equipment Rental' : 
                      vendor.vendorType === 'SALES' ? 'Equipment Sales' : 'Vendor Services';
    
    const svgUrl = `${backendUrl}/public/uploads/${svgFile}`;
    
    // Create the JavaScript widget script
    const badgeScript = `
    <script>
(function() {
  // Core Aeration Certificate Vendor Badge Widget
  var widgetId = '${widgetId}';
  var vendorData = {
    id: ${vendor.id},
    name: '${(vendor.name || '').replace(/'/g, "\'")}',
    appName: '${appName}',
    company: '${appName}',
    logo: '${logoUrl}',
    certified: ${isCertified},
    frontendUrl: '${searchUrl}',
  };

  function createBadgeWidget() {
    // Check if widget already exists
    if (document.getElementById(widgetId)) {
      return;
    }

    // Create widget container
    var widget = document.createElement('div');
    widget.id = widgetId;
    widget.style.cssText = \`
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 280px;
      background: linear-gradient(135deg, #a0b830 0%, #8fa329 100%);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 10000;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid rgba(255, 255, 255, 0.2);
    \`;

    // Create badge content
    var badgeContent = \`
      <div style="padding: 16px; color: white;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          ">
            \${vendorData.logo ? 
              \`<img src="\${vendorData.logo}" alt="Logo" style="width: 32px; height: 32px; object-fit: cover; border-radius: 4px;">\` : 
              \`<svg width="24" height="24" fill="#a0b830" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/></svg>\`
            }
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${appName} Badge
            </div>
            <div style="font-size: 12px; opacity: 0.9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              \${vendorData.company || vendorData.name}
            </div>
          </div>
          \${vendorData.certified ? 
            \`<div style="
              width: 20px;
              height: 20px;
              background: #22c55e;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            ">
              <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>\` : 
            \`<div style="
              width: 20px;
              height: 20px;
              background: #ef4444;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            ">
              <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </div>\`
          }
        </div>
        <div style="
          font-size: 11px;
          opacity: 0.8;
          text-align: center;
          padding-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        ">
          \${vendorData.certified ? '${appName} Vendor' : 'Thank You'}
        </div>
      </div>
    \`;

    widget.innerHTML = badgeContent;

    // Add hover effects
    widget.addEventListener('mouseenter', function() {
      widget.style.transform = 'translateY(-2px)';
      widget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
    });

    widget.addEventListener('mouseleave', function() {
      widget.style.transform = 'translateY(0)';
      widget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
    });

    // Add click handler to open vendor profile
    widget.addEventListener('click', function() {
      window.open(vendorData.frontendUrl, '_blank');
    });

    // Append to body
    document.body.appendChild(widget);
  }

  // Initialize widget when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBadgeWidget);
  } else {
    createBadgeWidget();
  }
})();
</script>
`;

    const result = {
      success: true,
      message: 'Badge script generated successfully',
              data: {
          script: customizeScript,
          badgeData: {
          badgeHtml: `<div onclick="window.open('${searchUrl}', '_blank')" 
     style="cursor: pointer; 
            display: inline-flex; 
            align-items: center; 
            justify-content: flex-start; 
            border: 2px solid #7CB342; 
            border-radius: 12px; 
            padding: 10px 15px; 
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); 
            box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
            transition: all 0.3s ease; 
            font-family: Arial, sans-serif; 
            min-width: 200px; 
            max-width: 280px;"
     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'"
     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
     
    <img src="${svgUrl}" 
         alt="Core Aeration Certified Vendor" 
         style="width: 45px; 
                height: 45px; 
                border-radius: 8px; 
                margin-right: 12px; 
                flex-shrink: 0;" />
                
    <div style="display: flex; 
                flex-direction: column; 
                align-items: flex-start;">
        <h3 style="margin: 0; 
                   font-size: 14px; 
                   font-weight: bold; 
                   color: #7CB342; 
                   line-height: 1.2;">Certificate Badge</h3>
        <span style="font-size: 10px; 
                     color: #666; 
                     margin-top: 2px;">Verified Vendor</span>
    </div>
    
    <div style="margin-left: auto; 
                width: 16px; 
                height: 16px; 
                background: #28a745; 
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center;">
        <span style="color: white; 
                     font-size: 10px; 
                     font-weight: bold;">✓</span>
    </div>
</div>`,
          imageHtml: `<div onclick="window.open('${searchUrl}', '_blank')" 
     style="cursor: pointer; 
            display: inline-flex; 
            align-items: center; 
            justify-content: flex-start; 
            border: 2px solid #7CB342; 
            border-radius: 12px; 
            padding: 10px 15px; 
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); 
            box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
            transition: all 0.3s ease; 
            font-family: Arial, sans-serif; 
            min-width: 200px; 
            max-width: 280px;"
     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'"
     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
     
    <img src="${svgUrl}" 
         alt="Core Aeration Certified Vendor" 
         style="width: 45px; 
                height: 45px; 
                border-radius: 8px; 
                margin-right: 12px; 
                flex-shrink: 0;" />
                
    <div style="display: flex; 
                flex-direction: column; 
                align-items: flex-start;">
        <h3 style="margin: 0; 
                   font-size: 14px; 
                   font-weight: bold; 
                   color: #7CB342; 
                   line-height: 1.2;">Certificate Badge</h3>
        <span style="font-size: 10px; 
                     color: #666; 
                     margin-top: 2px;">Verified Vendor</span>
    </div>
    
    <div style="margin-left: auto; 
                width: 16px; 
                height: 16px; 
                background: #28a745; 
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center;">
        <span style="color: white; 
                     font-size: 10px; 
                     font-weight: bold;">✓</span>
    </div>
</div>`,
          previewUrl: `${searchUrl}`,
          badgeType,
        },
        badgeInstructions: {
          title: 'How to Use Your Certificate Badge',
          steps: [
            'Copy the HTML code below',
            'Paste it anywhere in your website HTML where you want the badge to appear',
            'The badge will display as a professional certification badge with hover effects',
            'Visitors can click the badge to search for vendors in your area'
          ],
          notes: [
            'The badge includes hover animations and professional styling',
            'Shows your certified vendor status with modern design',
            'Automatically uses the correct SVG icon based on your vendor type',
            'Perfect for sidebars, footers, or any prominent location'
          ]
        },
        widgetId,
        vendor: {
          id: vendor.id,
          name: vendor.name,
          company: vendor.company,
          certified: isCertified,
          vendorType: vendor.vendorType,
        },
        instructions: {
          title: 'How to Install Your Appreciation Badge',
          steps: [
            'Copy the JavaScript code below',
            'Paste it before the closing </body> tag in your website HTML',
            'The badge will automatically appear in the selected position of your website',
            'Visitors can click the badge to view your vendor profile'
          ],
          notes: [
            'The badge is responsive and will work on all devices',
            'Shows appreciation for your partnership',
            'The badge design matches your company branding when possible'
          ]
        }
      },
    };
    
    return result;
  }

  async getVendorForBadge(vendorId: number) {
    const vendor = await this.prisma.user.findUnique({
      where: { id: vendorId, utype: 'VENDOR' },
      select: {
        id: true,
        name: true,
        company: true,
        vendorType: true,
        status: true,
        zipcodes: {
          select: {
            zipcode: true
          }
        }
      },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return {
      success: true,
      message: 'Vendor data retrieved successfully',
      data: vendor
    };
  }
}