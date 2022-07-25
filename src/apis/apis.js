import axios from 'axios';
export const postImg = img => {
  const formData = new FormData();
  formData.append('img', {
    uri: Platform.OS === 'ios' ? '/private' + img?.path : img?.uri,
    name: getFileName(img),
    type: img?.mime,
  });
  return new Promise((resole, reject) => {
    axios
      .post('http://210.245.51.29:8020/get_card_region', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        resole(res.data);
      })
      .catch(errors => {
        alert(errors);
        reject(errors => console.log(errors));
      });
  });
};
export const postImageAndPosition = data => {
  const {img, tlX, tlY, trX, trY, brX, brY, blX, blY} = data;
  const fromData = new FormData();
  fromData.append('img', {
    uri: Platform.OS === 'ios' ? '/private' + img?.path : img?.uri,
    name: getFileName(img),
    type: img?.mime,
  });

  fromData.append('tl', parseInt(tlX));
  fromData.append('tl', parseInt(tlY));

  fromData.append('tr', parseInt(trX));
  fromData.append('tr', parseInt(trY));

  fromData.append('br', parseInt(brX));
  fromData.append('br', parseInt(brY));

  fromData.append('bl', parseInt(blX));
  fromData.append('bl', parseInt(blY));

  // try {
  //   const response = await axios
  //     .post('http://210.245.51.29:8020/get_card_no', fromData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then(data => console.log(data));
  //   console.log('SSSS: ', response);
  // } catch (error) {
  //   const {response} = error;
  //   console.error(response);
  //   alert('Fail');
  // }

  return new Promise((resole, reject) => {
    axios
      .post('http://210.245.51.29:8020/get_card_no', fromData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => resole(res.data))
      .catch(errors => {
        alert(errors);
        reject(errors => console.log(errors));
      });
  });
};
function getFileName(file) {
  if (file.name !== undefined) {
    return file.name;
  } else if (file.filename !== undefined && file.filename !== null) {
    return file.filename;
  } else {
    const type = file?.mime || file?.type;
    return (
      Math.floor(Math.random() * Math.floor(999999999)) +
      '.' +
      type.split('/')[1]
    );
  }
}
