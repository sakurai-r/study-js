const obj = {
  om: function () {
    const nest = {
      nm: function () {
        console.log(this === obj, this === nest);
        console.log(this);
      },
      arrow: () => {
        console.log(this === obj, this === nest);
        console.log(this);
      },
    };
    nest.nm();
    nest.arrow();
  },
};
obj.om();
