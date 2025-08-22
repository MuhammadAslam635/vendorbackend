import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Copy, Download, Settings } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { useAuth } from '../../useAuth';
import { DashboardLayout } from './DashboardLayout';

interface BadgeSettings {
  position: 'BOTTOM_RIGHT' | 'BOTTOM_LEFT' | 'TOP_RIGHT' | 'TOP_LEFT' | 'BOTTOM_CENTER';
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
  showLogo: boolean;
  showAppreciationStatus: boolean;
}

interface BadgeResponse {
  data: {
    script: string;
    instructions: {
      title: string;
      steps: string[];
      notes: string[];
    };
  };
}

const CertificationBadge = () => {
  const { user } = useAuth();
  const [badgeScript, setBadgeScript] = useState<string>('');
  const [instructions, setInstructions] = useState<{
    title: string;
    steps: string[];
    notes: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<BadgeSettings>({
    position: 'BOTTOM_RIGHT',
    size: 'MEDIUM',
    showLogo: true,
    showAppreciationStatus: true
  });

  const generateBadge = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.get<BadgeResponse>(`${import.meta.env.VITE_BACKEND_URL}/vendor/badge/script`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setBadgeScript(response.data.data.script);
      setInstructions(response.data.data.instructions);
      toast.success('Certified Vendor Badge script generated successfully!');
    } catch (error) {
      console.error('Error generating badge:', error);
      toast.error('Failed to generate badge script');
    } finally {
      setLoading(false);
    }
  };

  const customizeBadge = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post<BadgeResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/vendor/badge/customize`,
        settings,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setBadgeScript(response.data.data.script);
      setInstructions(response.data.data.instructions);
      toast.success('Badge customized successfully!');
    } catch (error) {
      console.error('Error customizing badge:', error);
      toast.error('Failed to customize badge');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  const downloadScript = () => {
    const blob = new Blob([badgeScript], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'certified-vendor-badge.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Script downloaded!');
  };



  useEffect(() => {
    // Generate initial badge on component mount
    generateBadge();
  }, []);

  return (
    <DashboardLayout title="Certified Vendor Badge" user={user}>
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Certified Vendor Badge</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Display your certified vendor status on your website with our professional badge. 
            This badge shows visitors that you are a verified and trusted vendor partner.
          </p>
        </div>

        {/* Customization Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Badge Customization
            </CardTitle>
            <CardDescription>
              Customize the appearance and position of your certified vendor badge
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Position</label>
                <Select
                  value={settings.position}
                  onValueChange={(value: BadgeSettings['position']) =>
                    setSettings({ ...settings, position: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BOTTOM_RIGHT">Bottom Right</SelectItem>
                    <SelectItem value="BOTTOM_LEFT">Bottom Left</SelectItem>
                    <SelectItem value="BOTTOM_CENTER">Bottom Center</SelectItem>
                    <SelectItem value="TOP_RIGHT">Top Right</SelectItem>
                    <SelectItem value="TOP_LEFT">Top Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Size</label>
                <Select
                  value={settings.size}
                  onValueChange={(value: BadgeSettings['size']) =>
                    setSettings({ ...settings, size: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SMALL">Small</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="LARGE">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Show Logo</label>
              <Switch
                checked={settings.showLogo}
                onCheckedChange={(checked) => setSettings({ ...settings, showLogo: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Show Certification Status</label>
              <Switch
                checked={settings.showAppreciationStatus}
                onCheckedChange={(checked) => setSettings({ ...settings, showAppreciationStatus: checked })}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={customizeBadge} disabled={loading} className="w-full">
                {loading ? 'Generating...' : 'Apply Settings'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Script */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Script</CardTitle>
            <CardDescription>
              Copy this script and paste it into your website's HTML
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {badgeScript ? (
              <>
                <div className="relative">
                  <textarea
                    value={badgeScript}
                    readOnly
                    className="w-full min-h-[200px] p-4 font-mono text-sm border rounded-md bg-gray-50"
                    placeholder="Badge script will appear here..."
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(badgeScript)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => copyToClipboard(badgeScript)}
                    className="flex items-center gap-2 flex-1"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Script
                  </Button>
                  <Button
                    variant="outline"
                    onClick={downloadScript}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Generate your certified vendor badge script to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Installation Instructions */}
        {(instructions || badgeScript) && (
          <Card>
            <CardHeader>
              <CardTitle>Installation Instructions</CardTitle>
              <CardDescription>
                Follow these steps to add the certified vendor badge to your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              {instructions ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Steps:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      {instructions.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Notes:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {instructions.notes.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Steps:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      <li>Copy the JavaScript code above</li>
                      <li>Paste it before the closing &lt;/body&gt; tag in your website HTML</li>
                      <li>The certified vendor badge will automatically appear in the selected position</li>
                      <li>Visitors can click the badge to view your vendor profile</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Notes:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>The badge is responsive and will work on all devices</li>
                      <li>Shows your certified vendor status</li>
                      <li>The badge design matches your company branding</li>
                    </ul>
                  </div>
                </div>
              )}
              <Button
                variant="outline"
                onClick={() => copyToClipboard(instructions ? JSON.stringify(instructions, null, 2) : 'Installation instructions for certified vendor badge')}
                className="mt-4 flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy Instructions
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CertificationBadge;