import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Context/shopContext'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import ProductItem from '../Components/ProductItems'

const Collection = () => {
  
  const {products, search, showSearch} = useContext(ShopContext)
  const [showFilter,setShowFilter] = useState(true)
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')





  const toggleCategory = (e) =>{
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item => item !== e.target.value));
    }
    else{
setCategory(prev => [...prev, e.target.value])
    }
  };

  const toggleSubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== e.target.value));
    }
    else{
setSubCategory(prev => [...prev, e.target.value])
    }
  };

  const applyFilter = () =>{

    let productsCopy = products.slice();
if(showSearch && search){
productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
}



    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
  }
  if (subCategory.length > 0 ) {
    productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
  }

  setFilterProducts(productsCopy)
  }
 const sortProduct = () =>{
let fpCopy = filterProducts.slice();

switch(sortType)
{
  case 'low-high':
    setFilterProducts(fpCopy.sort( (a,b)=>(a.price - b.price))); break;

    case 'high-low':     setFilterProducts(fpCopy.sort( (a,b)=>(b.price - a.price))); break;
    default: applyFilter(); break;
}
 }

 

  useEffect(
    () => {applyFilter()}, [category, subCategory, search, showSearch]
  )

  useEffect(
    () => {sortProduct();}, [sortType]
  )

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
{/* LHS */}
     <div>
 {/* Filter option */}
 <div className='min-w-60'>
<p  className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS <img src={assets.dropdown_icon} onClick={ () =>setShowFilter(!showFilter)} alt="" className={`h-3 sm:hidden ${ showFilter ? 'rotate-90' :''}`} /></p>
{/* CATEGORY FILTER */}
<div className={`border border-gray-300  pl-5 py-3 mt-6  ${showFilter ? '' : "hidden"}`}>
<p className='mb-3 font-medium text-sm '> CATEGORY</p>
<div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
<p className='flex gap-2 '>
<input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory}/>Men
</p>
<p className='flex gap-2 '>
<input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}  />Women
</p>
<p className='flex gap-2 '>
<input type="checkbox" className='w-3' value={'Kids'}  onChange={toggleCategory} />kids
</p>

</div>
</div>

{/* Sub Category filter */}
      </div>
      <div className={`border border-gray-300 pl-5 py-3  my-5  ${showFilter ? '' : "hidden"}`}>
<p className='mb-3 font-medium text-sm'>TYPE</p>
<div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
<p className='flex gap-2'>
<input type="checkbox" className='w-3' value={'Topwear'}  onChange={toggleSubCategory}/>Topwear
</p>
<p className='flex gap-2'>
<input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
</p>
<p className='flex gap-2'>
<input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
</p>

</div>
</div>

     </div>

{/* RHS */}
<div className='flex-1'>
<div  className='flex justify-between text-base items-start sm:text-2xl mb-4'>
<Title text1={'ALL'} text2={'COLLECTIONS'}/>
{/* Product Sort */}
<select onChange={(e) =>setSortType(e.target.value)}name="" id="" className='border-2 border-gray-300 text-sm px-2 py-2 outline-none '>
  <option value="relevant">Sort by: Relevance</option>
  <option value="low-high">Sort by: Low to high</option>
  <option value="high-low">Sort by:High to low</option>
</select>
</div>

{/* Map Products */}
<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
{
  filterProducts.map(
    (item, index) =>
    (
      <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
    )
  )
}
</div>

</div>

    </div>
  )
}

export default Collection
