import { usePage } from '~/@inertiajs/react';
import axios from '~/axios';
import React, { useEffect, useState } from '~/react'

function useComon() {
    const { user } = usePage().props;

    const formatDateToCustomFormat = (inputDate) => {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
        const year = String(date.getFullYear()).slice(-2); // Get the last 2 digits of the year
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    const makeUrl = (newURL) =>{
        const currentURL = window.location.href;
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('shop', user.name);
        const newURLWithParams = `${newURL}?${urlParams.toString()}`;
        return newURLWithParams;
    }


    const chunkArray = (arr, chunkSize)  => {
        const chunkedArray = [];
        let index = 0;
        if(arr.length > 0){
            while (index < arr.length) {
                chunkedArray.push(arr.slice(index, index + chunkSize));
                index += chunkSize;
            }
        }

        return chunkedArray;
    }

    const next = (arr, i) =>{
        if(i >= 0 && i < arr.length - 1){
            return i++;
        }
        return null;
    }

    const prev = (arr, i) =>{
        if(i >= 0 && i > arr.length - 1){
            return i++;
        }
        return null;
    }

      const baseUrl = window.origin;
      const axiosHttp = axios.create({
        baseURL: baseUrl, // Replace with your API's base URL
        headers: {
          'Accept': 'application/json',
          'Authorization':  localStorage.getItem('front_sesstion_token')
        }
      });


    return { makeUrl, axiosHttp, formatDateToCustomFormat, chunkArray, next };
}

export default useComon
