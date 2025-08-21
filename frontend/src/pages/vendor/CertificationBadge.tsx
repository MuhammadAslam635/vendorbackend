import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Copy, Download, Eye, Settings } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { useAuth } from '../../useAuth';
import { DashboardLayout } from './DashboardLayout';

interface BadgeSettings {
  position: 'BOTTOM_RIGHT' | 'BOTTOM_LEFT' | 'TOP_RIGHT' | 'TOP_LEFT';
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
  customText?: string;
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
  const [previewVisible, setPreviewVisible] = useState(false);
  const [settings, setSettings] = useState<BadgeSettings>({
    position: 'BOTTOM_RIGHT',
    size: 'MEDIUM',
    customText: '',
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
      toast.success('Badge script generated successfully!');
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
    a.download = 'appreciation-badge.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Script downloaded!');
  };

  const togglePreview = () => {
    setPreviewVisible(!previewVisible);
    if (!previewVisible && badgeScript) {
      // Inject the script for preview
      const script = document.createElement('script');
      script.innerHTML = badgeScript;
      document.body.appendChild(script);
    } else if (previewVisible) {
      // Remove the badge for cleanup
      const existingBadge = document.getElementById('core-aeration-badge');
      if (existingBadge) {
        existingBadge.remove();
      }
    }
  };

  useEffect(() => {
    // Generate initial badge on component mount
    generateBadge();
    
    // Cleanup on unmount
    return () => {
      const existingBadge = document.getElementById('core-aeration-badge');
      if (existingBadge) {
        existingBadge.remove();
      }
    };
  }, []);

  return (
    <DashboardLayout title="Appreciation Badge" user={user}>
      <div className="container mx-auto p-6 space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appreciation Badge</h1>
            <p className="text-gray-600 mt-2">
              Generate and customize your appreciation badge for your website
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Badge Customization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Badge Settings
              </CardTitle>
              <CardDescription>
                Customize the appearance and behavior of your certification badge
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position">Position</Label>
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
                      <SelectItem value="TOP_RIGHT">Top Right</SelectItem>
                      <SelectItem value="TOP_LEFT">Top Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="size">Size</Label>
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

              <div>
                <Label htmlFor="customText">Custom Text (Optional)</Label>
                <Input
                  id="customText"
                  value={settings.customText}
                  onChange={(e) => setSettings({ ...settings, customText: e.target.value })}
                  placeholder="Enter custom text for the badge"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showLogo">Show Logo</Label>
                <Switch
                  id="showLogo"
                  checked={settings.showLogo}
                  onCheckedChange={(checked) => setSettings({ ...settings, showLogo: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showAppreciationStatus">Show Appreciation Status</Label>
                <Switch
                  id="showAppreciationStatus"
                  checked={settings.showAppreciationStatus}
                  onCheckedChange={(checked) => setSettings({ ...settings, showAppreciationStatus: checked })}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={customizeBadge} disabled={loading} className="flex-1">
                  {loading ? 'Generating...' : 'Apply Settings'}
                </Button>
                <Button
                  variant="outline"
                  onClick={togglePreview}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  {previewVisible ? 'Hide' : 'Preview'}
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
                    <Textarea
                      value={badgeScript}
                      readOnly
                      className="min-h-[200px] font-mono text-sm"
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
                  <p>Generate your badge script to get started</p>
                  <div className="mt-4 text-xs text-gray-400">
                    <p>Debug: badgeScript length: {badgeScript.length}</p>
                    <p>Debug: instructions: {instructions ? 'Present' : 'Null'}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Installation Instructions */}
        {(instructions || badgeScript) && (
          <Card>
            <CardHeader>
              <CardTitle>Installation Instructions</CardTitle>
              <CardDescription>
                Follow these steps to add the appreciation badge to your website
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
                      <li>The badge will automatically appear in the bottom-right corner of your website</li>
                      <li>Visitors can click the badge to view your vendor profile</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Notes:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>The badge is responsive and will work on all devices</li>
                      <li>Shows appreciation for your partnership</li>
                      <li>The badge design matches your company branding when possible</li>
                    </ul>
                  </div>
                </div>
              )}
              <Button
                variant="outline"
                onClick={() => copyToClipboard(instructions ? JSON.stringify(instructions, null, 2) : 'Installation instructions for appreciation badge')}
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