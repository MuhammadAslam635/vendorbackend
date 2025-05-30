import { useState } from "react";
import { PlusCircle, X, Loader2, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

interface ZipCodeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayment: (zipcodes: string[]) => void;
  packageName: string;
  maxZipcodes: number;
}

const ZipCodeSelectionModal = ({ 
  isOpen, 
  onClose, 
  onProceedToPayment, 
  packageName, 
  maxZipcodes
}: ZipCodeSelectionModalProps) => {
  const [newZipcode, setNewZipcode] = useState("");
  const [selectedZipcodes, setSelectedZipcodes] = useState<string[]>([]);
  const [isLoading] = useState(false);

  const handleAddZipcode = () => {
    if (!newZipcode.trim()) {
      toast.error("Please enter a ZIP code");
      return;
    }

    // Validate ZIP code format (assuming US ZIP code format)
    const zipCodeRegex = /^\d{5}(-\d{4})?$/;
    if (!zipCodeRegex.test(newZipcode.trim())) {
      toast.error("Please enter a valid ZIP code (e.g., 12345 or 12345-6789)");
      return;
    }

    // Check if zipcode is already in current selection
    if (selectedZipcodes.includes(newZipcode.trim())) {
      toast.error("This ZIP code is already selected");
      return;
    }

    if (selectedZipcodes.length >= maxZipcodes) {
      toast.error(`This package allows exactly ${maxZipcodes} ZIP codes.`);
      return;
    }

    const newSelection = [...selectedZipcodes, newZipcode.trim()];
    setSelectedZipcodes(newSelection);
    setNewZipcode("");
    
    // Show success message with progress
    if (newSelection.length === maxZipcodes) {
      toast.success(`Perfect! All ${maxZipcodes} ZIP codes added. Ready to proceed to payment!`);
    } else {
      toast.success(`ZIP code added! ${maxZipcodes - newSelection.length} more needed to complete.`);
    }
  };

  const handleRemoveZipcode = (zipcode: string) => {
    const newSelection = selectedZipcodes.filter(z => z !== zipcode);
    setSelectedZipcodes(newSelection);
    
    const remaining = maxZipcodes - newSelection.length;
    if (remaining > 0) {
      toast.info(`${remaining} more ZIP code${remaining > 1 ? 's' : ''} needed to proceed.`);
    }
  };

  const handleProceedToPayment = () => {
    if (selectedZipcodes.length !== maxZipcodes) {
      toast.error(`Please add exactly ${maxZipcodes} ZIP codes to proceed with the ${packageName} package.`);
      return;
    }
    
    onProceedToPayment(selectedZipcodes);
  };

  const handleClose = () => {
    setSelectedZipcodes([]);
    setNewZipcode("");
    onClose();
  };

  const canAddMore = selectedZipcodes.length < maxZipcodes;
  const canProceedToPayment = selectedZipcodes.length === maxZipcodes;
  const remainingZipcodes = maxZipcodes - selectedZipcodes.length;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#a0b830]" />
            Add ZIP Codes for {packageName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Package Info Card */}
          <Card className="bg-gradient-to-r from-[#a0b830]/5 to-[#a0b830]/10 border-[#a0b830]/20">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{packageName}</h3>
                  <p className="text-sm text-gray-600">
                    This package requires exactly <span className="font-bold text-[#a0b830]">{maxZipcodes}</span> ZIP codes
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-black">
                    {selectedZipcodes.length}/{maxZipcodes}
                  </div>
                  <div className="text-xs text-gray-500">ZIP codes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ZIP Code Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Add New ZIP Codes
                {remainingZipcodes > 0 && (
                  <span className="text-sm font-normal text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                    {remainingZipcodes} more needed
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    canProceedToPayment ? 'bg-green-500' : 'bg-[#a0b830]'
                  }`}
                  style={{ width: `${(selectedZipcodes.length / maxZipcodes) * 100}%` }}
                ></div>
              </div>

              {/* ZIP Code Input */}
              <div className="flex items-center gap-2">
                <Input
                  value={newZipcode}
                  onChange={(e) => setNewZipcode(e.target.value)}
                  placeholder="Enter ZIP code (e.g., 12345)"
                  disabled={isLoading || !canAddMore}
                  maxLength={10}
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddZipcode();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddZipcode}
                  className="bg-[#a0b830] hover:bg-[#8fa029] text-white"
                  disabled={isLoading || !canAddMore}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <PlusCircle className="h-4 w-4 mr-1" /> Add
                    </>
                  )}
                </Button>
              </div>

              {/* Status Messages */}
              {!canAddMore && selectedZipcodes.length === maxZipcodes && (
                <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                  <p className="text-green-800 text-sm font-medium">
                    ✅ Perfect! You've added all {maxZipcodes} required ZIP codes. Ready to proceed!
                  </p>
                </div>
              )}

              {!canAddMore && selectedZipcodes.length < maxZipcodes && (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    You've reached the maximum. Remove some ZIP codes if you want to add different ones.
                  </p>
                </div>
              )}

              {/* Selected ZIP Codes Display */}
              <div className="mt-4">
                <Label className="text-sm font-medium">Selected ZIP Codes</Label>
                <div className="mt-2 min-h-[60px] border-2 border-dashed border-gray-200 rounded-lg p-3">
                  {selectedZipcodes.length === 0 ? (
                    <div className="flex items-center justify-center h-12 text-gray-400">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span className="text-sm">No ZIP codes added yet</span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedZipcodes.map((zipcode, index) => (
                        <div
                          key={`${zipcode}-${index}`}
                          className="bg-[#a0b830] bg-opacity-10 border border-[#a0b830] px-3 py-2 rounded-lg flex items-center gap-2 transition-all hover:bg-[#a0b830] hover:bg-opacity-20"
                        >
                          <MapPin className="h-4 w-4 text-[#a0b830]" />
                          <span className="text-white font-medium">{zipcode}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveZipcode(zipcode)}
                            className="text-white hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded"
                            disabled={isLoading}
                            title="Remove ZIP code"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleProceedToPayment}
              className={`flex-1 text-black transition-all ${
                canProceedToPayment 
                  ? 'bg-green-600 hover:bg-green-700 shadow-lg' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={isLoading || !canProceedToPayment}
            >
              {canProceedToPayment ? (
                <>
                  Proceed to Payment 
                  <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
                    {selectedZipcodes.length} ZIP codes
                  </span>
                </>
              ) : (
                `Add ${remainingZipcodes} more ZIP code${remainingZipcodes !== 1 ? 's' : ''}`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZipCodeSelectionModal;