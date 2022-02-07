export type Days = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface CreateSalonFormArguments {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  contactEmail: string;
  type: string;
  image: string;
  openingHours: {
    monday: {
      open: string;
      close: string;
    };
    tuesday: {
      open: string;
      close: string;
    };
    wednesday: {
      open: string;
      close: string;
    };
    thursday: {
      open: string;
      close: string;
    };
    friday: {
      open: string;
      close: string;
    };
    saturday: {
      open: string;
      close: string;
    };
    sunday: {
      open: string;
      close: string;
    };
  };
  crewInput: string;
  crew: {
    name: string;
    imageId: string;
  }[];
  service: {
    name: string;
    price: string;
    duration: string;
    description: string;
  };
  services: {
    name: string;
    price: string;
    duration: string;
    description: string;
  }[];
}
