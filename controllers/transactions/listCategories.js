const { Category } = require("../../models/category")

const listCategories = async (req, res) => {

    const { category_type = "expense" } = req.query;
  
 
    const result = await Category.find({ category_type })
    res.json(result)
}


const isValidCategory = async (category_type, category_id) => {
  
  const result = await Category.find({ category_type, category_id }, "category_id category_name")
  return (result.length !== 0);
}

const getCategoryName = async (category_type, category_id) => {
  // console.log(category_type, category_id);
  // const result = await Category.find({ category_type, category_id }, "category_id category_name")
  
  // console.log(result[0].category_name);
  // return (result[0].category_name);
}

module.exports = { listCategories, isValidCategory, getCategoryName };
