import React from 'react';

const Groceries = async () => {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories')
    const data= await res.json()
    
    return (
        <div>
            
        </div>
    );
};

export default Groceries;