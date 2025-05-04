"use client"
import { QueryClient } from '@tanstack/react-query';
import CustomToast from '../components/ui/CustomToast';

const queryClient = new QueryClient({
    defaultOptions: {
        // queries: {
        //   onError: (error: any) => {
        //     const errorMessage = error.response?.data?.message;
        //     Toast.show({
        //       type: "error",
        //       text1: "Error",
        //       text2: errorMessage,
        //     });
        //   },
        // },
        mutations: {
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message;
                <CustomToast title='error' backgroundColor='red' message={errorMessage}/>
            },
            // onSuccess: (data: any) => {
            //     const successMessage = data?.message;
            //     Toast.show({
            //         type: 'success',
            //         text1: 'Success',
            //         text2: successMessage,
            //     });
            // },
        },
    },
});

export default queryClient;
