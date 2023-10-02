
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function IntroModal({visible, setVisible}) {

    return (
      <Dialog header="Header" visible={visible} modal={false} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
      <div style={{width: '50vw', height:"500px", background:"red" }}>

      </div>
     </Dialog>
    )
}
        
