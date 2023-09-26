import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

function useExport() {

    const { base_url, user } = usePage().props;
    const [loadingExport, setLoading] = useState(false);

    const onExport = () =>{
        setLoading(true);
        axios.get(`${base_url}/api/front/wishlists/export?shop=${user?.name}`, {
            responseType: 'blob', // Set the response type to blob
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            setLoading(false);
            link.href = url;
            link.setAttribute('download', 'all_wishlists.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(error => {
            setLoading(false);
            console.error('Error downloading file:', error);
        });


    }

    const onCustomerExport = (id) =>{
        setLoading(true);
        axios.get(`${base_url}/api/front/customers/export?customer_id=${id}&shop=${user?.name}`, {
            responseType: 'blob', // Set the response type to blob
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            setLoading(false);
            link.href = url;
            link.setAttribute('download', 'export_by_customers.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(error => {
            setLoading(false);
            console.error('Error downloading file:', error);
        });


    }

    return {
        onExport,
        onCustomerExport,
        loadingExport
    };
}

export default useExport
