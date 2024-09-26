const time = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
const fetchUserDetails = async (userID) => {
  console.log("Featching user details");
  await time(500);
  return `http://image.example.com/${userID}`;
};

const downloadImage = async (imageURL) => {
  console.log("Downloding image");
  await time(500);

  return `Image data for ${imageURL}`;
};

const render = async (image) => {
  await time(500);
  console.log("render Image");
};

const run = async () => {
  const imageURL = await fetchUserDetails("jhion");
  const imageData = await downloadImage(imageURL);
  await render(imageData);
};

run();

// praymid of doom

// fetchUserDetails("john", (imageURL) => {
//   downloadImage(imageURL, (imageData) => {
//     render(imageData);
//   });
// });
