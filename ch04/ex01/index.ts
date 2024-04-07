type ComplexNumber = {
  real: number;
  imaginary: number;
};

export const add = (z1: ComplexNumber, z2: ComplexNumber) => {
  return {
    real: z1.real + z2.real,
    imaginary: z1.imaginary + z2.imaginary,
  };
};

export const sub = (z1: ComplexNumber, z2: ComplexNumber) => {
  return {
    real: z1.real - z2.real,
    imaginary: z1.imaginary - z2.imaginary,
  };
};

export const mul = (z1: ComplexNumber, z2: ComplexNumber) => {
  return {
    real: z1.real * z2.real,
    imaginary: z1.imaginary * z2.imaginary,
  };
};

export const div = (z1: ComplexNumber, z2: ComplexNumber) => {
  return {
    real: z1.real / z2.real,
    imaginary: z1.imaginary / z2.imaginary,
  };
};
