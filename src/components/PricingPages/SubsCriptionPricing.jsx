import React from 'react'
import PriceRange from '../../pages/pricing/PriceRange'
import AddToSubscription from './AddToSubscription'

const SubsCriptionPricing = () => {
    return (
        <div style={{paddingBottom:"150px"}}>
            <PriceRange component={<AddToSubscription />} />
        </div>
    )
}

export default SubsCriptionPricing