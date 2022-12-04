const { Category } = require("../../models/category")

const listCategories = async (req, res) => {

    const { category_type = "expense" } = req.query;
  
 
    const result = await Category.find({ category_type }, "category_id category_name")
    res.json(result)
}


const isValidCategory = async (category_id, category_type) => {
  
 
    const result = await Category.find({ category_type, category_id }, "category_id category_name")
  console.log(result)
}



module.exports = { listCategories, isValidCategory };

