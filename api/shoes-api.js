import ShortUniqueId from "short-unique-id";
let uid = new ShortUniqueId({ length: 5 });

export default function (ShoesData) {
  let id = uid();
  async function getCategories(req, res, next) {
    try {
      let results = await ShoesData.categories();
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function showByCategory(req, res, next) {
    try {
      let category = req.params.category;
      let results = await ShoesData.filterCategory(category);
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function displayProducts(req, res, next) {
    try {
      req.session.user = id;
      let results = await ShoesData.allShoes();
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function getShoe(req, res, next) {
    try {
      let id = Number(req.params.id);
      let results = await ShoesData.selectedShoe(id);
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function showBrands(req, res, next) {
    try {
      let results = await ShoesData.brands();
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function showSizes(req, res, next) {
    try {
      let results = await ShoesData.sizes();
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function showColors(req, res, next) {
    try {
      let results = await ShoesData.colors();
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function searchBrand(req, res, next) {
    try {
      let brand = req.params.brandname;
      let results = await ShoesData.searchByBrand(brand);

      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function searchSize(req, res, next) {
    try {
      let size = Number(req.params.size);
      let results = await ShoesData.searchBySize(size);

      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function searchColor(req, res, next) {
    try {
      let color = req.params.color;
      let results = await ShoesData.searchByColor(color);
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function searchBrandColor(req, res, next) {
    try {
      let brand = req.params.brandname;
      let color = req.params.color;
      let results = await ShoesData.searchByBrandColor(brand, color);
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function searchSizeColor(req, res, next) {
    try {
      let size = Number(req.params.size);
      let color = req.params.color;
      let results = await ShoesData.searchBySizeColor(size, color);
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }

  async function searchBrandSize(req, res, next) {
    try {
      let brand = req.params.brandname;
      let size = Number(req.params.size);
      let results = await ShoesData.searchByBrandSize(brand, size);
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function searchAll(req, res, next) {
    try {
      let brand = req.params.brandname;
      let size = Number(req.params.size);
      let color = req.params.color;
      if (brand === undefined) {
        brand = "";
      }
      if (color === undefined) {
        color = "";
      }
      let results = await ShoesData.searchByAll(brand, size, color);
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function addToCart(req, res, next) {
    try {
      let id = Number(req.params.id);
      let size = Number(req.params.size);
      let qty = Number(req.params.qty);
      let sessionId = req.session.user;
      await ShoesData.addItem(id, size, qty, sessionId);
      res.json({
        status: "success",
      });
    } catch (err) {
      next(err);
    }
  }
  async function countItems(req, res, next) {
    try {
      let sessionId = req.session.user;
      let results = await ShoesData.cartCount(sessionId);
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function viewCart(req, res, next) {
    try {
      let sessionId = req.session.user;
      let results = await ShoesData.displayCart(sessionId);

      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function qtyUpdate(req, res, next) {
    try {
      let qty = Number(req.params.qty);
      let orderId = Number(req.params.orderId);
      let sessionId = req.session.user;
      console.log(orderId);
      let results = await ShoesData.updtQty(orderId, qty, sessionId);

      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function confirm(req, res, next) {
    try {
      let orderId = Number(req.params.id);

      let results = await ShoesData.confirmData(orderId);
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function remove(req, res, next) {
    try {
      let orderId = Number(req.params.id);
      let sessionId = req.session.user;
      let results = await ShoesData.removeItem(orderId, sessionId);
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  async function checkOut(req, res, next) {
    try {
      let results = await ShoesData.checkOutItems();
      res.json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  }
  return {
    getCategories,
    displayProducts,
    getShoe,
    showBrands,
    showSizes,
    showColors,
    searchBrand,
    searchSize,
    searchColor,
    searchBrandColor,
    searchSizeColor,
    searchBrandSize,
    searchAll,
    showByCategory,
    addToCart,
    countItems,
    viewCart,
    qtyUpdate,
    confirm,
    remove,
    checkOut,
  };
}
