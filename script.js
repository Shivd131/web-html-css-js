fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json"
)
  .then((response) => response.json())
  .then((data) => {
    const product = data.product;
    console.log(data);

    document.getElementById("product-vendor").textContent = product.vendor;

    document.getElementById("product-title").textContent = product.title;

    document.getElementById("product-price").textContent = product.price;

    const comparePrice = document.getElementById("compare-price");
    if (product.compare_at_price) {
      comparePrice.textContent = product.compare_at_price;
    } else {
      comparePrice.style.display = "none";
    }
    document.getElementById("product-description").innerHTML =
      product.description;

    const mainImage = document.getElementById("main-image");
    // mainImage.src = product.images[0].src;

    // Create thumbnail images
    // product.images.forEach(image => {
    //   const thumbnail = document.createElement('img');
    //   thumbnail.src = image.src;
    //   thumbnail.addEventListener('click', () => {
    //     mainImage.src = image.src;
    //   });
    //   thumbnailImages.appendChild(thumbnail);
    // });

    // This could have been done if the image URLs were working, iterate through theurls and put the srcs to images.
    // Instead, we'll some unsplash image URLs for images
    const imageUrls = [
      "https://images.unsplash.com/photo-1712995517632-3e5f85fb4537?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1712995517670-a40858648bec?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1712995519613-60d8d4143de9?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1712995519678-68b1861866cd?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];
    mainImage.src = imageUrls[0];

    const thumbnailImages = document.querySelector(".thumbnail-images");
    imageUrls.forEach((url) => {
      const thumbnail = document.createElement("img");
      thumbnail.src = url;
      thumbnail.addEventListener("click", () => {
        mainImage.src = url;
      });
      thumbnailImages.appendChild(thumbnail);
    });
    const colorSelect = document.getElementById("color-select");
    product.options[0].values.forEach((color) => {
      const option = document.createElement("option");
      option.value = Object.keys(color)[0];
      option.text = Object.keys(color)[0];
      option.style.backgroundColor = Object.values(color)[0];
      colorSelect.appendChild(option);
    });

    const sizeSelect = document.getElementById("size-select");
    product.options[1].values.forEach((size) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "size";
      radio.value = size;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(size));
      sizeSelect.appendChild(label);
    });

    const decrementButton = document.getElementById("decrement");
    const incrementButton = document.getElementById("increment");
    const quantityInput = document.getElementById("quantity");

    decrementButton.addEventListener("click", () => {
      quantityInput.value = Math.max(parseInt(quantityInput.value) - 1, 1);
    });

    incrementButton.addEventListener("click", () => {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });
  })
  .catch((error) => console.error("Error fetching product data:", error));
