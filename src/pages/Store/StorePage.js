import React from 'react';
import StoreCard from './StorePageCard';
const StorePage = ({ noTitle = false }) => {
  const stores = [
    {
      id: 1,
      title: 'Apple Briarwood',
      text1: '100 Briarwood Circle',
      text2: 'Ann Arbor, MI 48108',
      timeText: 'Open Until 8:00 p.m',
      image:
        'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      title: 'Apple Belleve Square',
      text1: '213 Belleve Square',
      text2: 'Belleve, WA 98004',
      timeText: 'Opens at 10:00 a.m',
      image:
        'https://images.pexels.com/photos/954585/pexels-photo-954585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 3,
      title: 'App Pheasant Lane',
      text1: '310 Daniel Webster Highway',
      text2: 'Nashua, NH 03060',
      timeText: 'Open until 8:00 p.m',
      image:
        'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];
  return (
    <div style={{ backgroundColor: '#ebebeb', padding: '90px 0' }}>
      <div className='container'>
        {!noTitle && (
          <h2
            style={{
              textAlign: 'center',
              fontSize: '42px',
              marginBottom: '70px',
            }}
          >
            Tiendas
          </h2>
        )}

        <div className='row'>
          {stores.map((item) => (
            <div className='col-12 col-sm-6 col-md-4 col-xxl-3 pb-4'>
              <StoreCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
