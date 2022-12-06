const { Category } = require("../../models/category")

const listCategories = async (req, res) => {

    const { category_type = "expense" } = req.query;
  
 
    const result = await Category.find({ category_type })
    res.json(result)
}


const isValidCategory = async (category_type, category_id) => {
  console.log(category_type, "222");
  const result = await Category.find({ category_type, category_id }, "category_id category_name")
  
  console.log(result);
  console.log(result.length !== 0);
  return (result.length !== 0);
}

module.exports = { listCategories, isValidCategory };
