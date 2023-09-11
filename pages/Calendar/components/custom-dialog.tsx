import * as React from 'react';
import { Dialog, DialogProps, DialogActionsBar } from '@progress/kendo-react-dialogs';

export const CustomDialog = (props: DialogProps) => {
    console.log('props hnéé', props);
    return <Dialog  {...props} closeIcon={false} themeColor='light' title={'Add Event'} >

    </Dialog>;
};