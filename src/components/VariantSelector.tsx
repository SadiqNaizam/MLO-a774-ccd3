import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VariantOption {
  id: string;
  name: string; // e.g., "Red", "Large"
  value: string; // e.g., "red", "L"
  available: boolean;
  // Add other properties like price impact if needed
}

interface VariantGroup {
  id: string;
  name: string; // e.g., "Color", "Size"
  type: 'radio' | 'select' | 'button'; // How to display options
  options: VariantOption[];
}

interface VariantSelectorProps {
  variantGroups: VariantGroup[];
  selectedVariants: Record<string, string>; // e.g., { color: "red", size: "L" }
  onVariantChange: (variantGroupId: string, optionValue: string) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  variantGroups,
  selectedVariants,
  onVariantChange,
}) => {
  console.log("Rendering VariantSelector with groups:", variantGroups.length);

  if (!variantGroups || variantGroups.length === 0) {
    return null; // Or some placeholder if variants are expected but not loaded
  }

  return (
    <div className="space-y-6">
      {variantGroups.map((group) => (
        <div key={group.id}>
          <Label className="text-sm font-medium text-foreground mb-2 block">{group.name}</Label>
          {group.type === 'radio' && (
            <RadioGroup
              value={selectedVariants[group.id]}
              onValueChange={(value) => onVariantChange(group.id, value)}
              className="flex flex-wrap gap-2"
            >
              {group.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <RadioGroupItem
                    value={option.value}
                    id={`${group.id}-${option.id}`}
                    disabled={!option.available}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`${group.id}-${option.id}`}
                    className={`border rounded-md px-3 py-1.5 text-sm cursor-pointer transition-colors
                                ${!option.available ? 'opacity-50 cursor-not-allowed bg-muted' : 'hover:bg-accent'}
                                peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground`}
                  >
                    {option.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
          {group.type === 'select' && (
             <Select
                value={selectedVariants[group.id]}
                onValueChange={(value) => onVariantChange(group.id, value)}
                disabled={group.options.every(opt => !opt.available)}
             >
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder={`Select ${group.name.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                    {group.options.map(option => (
                        <SelectItem key={option.id} value={option.value} disabled={!option.available}>
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectContent>
             </Select>
          )}
          {/* Add 'button' type rendering if needed */}
        </div>
      ))}
    </div>
  );
};
export default VariantSelector;