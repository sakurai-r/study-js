const block = () => {
  const value = "value1";
  {
    const value = "value2";
    console.log(value);

    {
      const value = "value3";
      console.log(value);
    }
  }
  console.log(value);
};

block();
