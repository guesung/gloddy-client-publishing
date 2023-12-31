import { ProfileEditState } from '../../type';
import { BottomSheet } from '@/components/Modal';
import countaryList from '@/constants/countary.json';
import Image from 'next/image';
import { Control, useController } from 'react-hook-form';

interface CountryBotoomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  control: Control<any>;
}

interface Country {
  countaryNameInEnglish: string;
  countaryNameInKorean: string;
  countaryImage: string;
}

export default function CountryBotoomSheet({ isOpen, onClose, control }: CountryBotoomSheetProps) {
  const { field: fieldCountryName } = useController({
    name: 'countryName',
    control,
    rules: {
      required: true,
    },
  });
  const { field: fieldCountryImage } = useController({
    name: 'countryImage',
    control,
    rules: {
      required: true,
    },
  });
  const handleCountry = (country: Country) => {
    console.log(country);
    fieldCountryName.onChange(country.countaryNameInEnglish);
    fieldCountryImage.onChange(country.countaryImage);
    onClose();
  };

  return (
    <BottomSheet
      onClose={onClose}
      isOpen={isOpen}
      snapPoints={[800, 0]}
      isTapOutsideToClose
      disableDrag
      title="출신 국가"
    >
      <ul className="overflow-scroll">
        {countaryList.map((country, index) => (
          <li
            key={index}
            className="flex gap-8 py-12 text-subtitle-2"
            onClick={() => handleCountry(country)}
          >
            <Image
              src={country.countaryImage}
              width={24}
              height={24}
              alt={country.countaryNameInEnglish}
            />
            {country.countaryNameInEnglish}
          </li>
        ))}
      </ul>
    </BottomSheet>
  );
}
