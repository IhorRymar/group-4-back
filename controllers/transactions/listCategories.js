const { Category } = require("../../models/category")

const listCategories = async (req, res) => {

    const { category_type = "expense" } = req.query;
  
 
    const result = await Category.find({ category_type }, "category_id category_name")
    res.json(result)
}

module.exports = listCategories;