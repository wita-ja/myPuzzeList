import React from 'react';
import { Button, Header, Icon } from 'semantic-ui-react';

export const FileUpload = () => {
  const uploadFile = () => {};

  const handleAddDocument = () => {};
  return (
    <>
      <Button fluid icon size='huge' onClick={handleAddDocument}>
        <Icon size='big' name={'cloud upload'}></Icon>
        <Header as='h3'>Upload image</Header>
      </Button>

      <input
        type='file'
        id='imageUpload'
        name='filename'
        hidden
        onChange={uploadFile}
      ></input>
    </>
  );
};

export default FileUpload;
/* 
<Header icon size='small'>
  <Icon size='mini' name='cloud upload' />
</Header>; */
