import axios from 'axios';
export const postImg = img => {
  const fromData = new FormData();
  fromData.append('img', {
    uri: img?.path,
    name: getFileName(img),
    type: img?.mime,
  });

  return new Promise((resole, reject) => {
    axios
      .post('http://210.245.51.29:8020/get_card_region', fromData, {
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
export const postImageAndPosition = async data => {
  const {img, tl, tr, br, bl} = data;
  const fromData = new FormData();
  // console.log(img, typeof img);
  fromData.append('img', {
    uri: img?.path,
    name: getFileName(img),
    type: img?.mime,
  });
  // console.log(tl, typeof tl);

  fromData.append('tl', parseInt(tl.x * 3.5));
  fromData.append('tl', parseInt(tl.y * 3.5));

  fromData.append('tr', parseInt(tr.x * 3.5));
  fromData.append('tr', parseInt(tr.y * 3.5));

  fromData.append('br', parseInt(br.x * 3.5));
  fromData.append('br', parseInt(br.y * 3.5));

  fromData.append('bl', parseInt(bl.x * 3.5));
  fromData.append('bl', parseInt(bl.y * 3.5));

  return new Promise((resole, reject) => {
    axios
      .post('http://210.245.51.29:8020/get_card_no', fromData, {
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
