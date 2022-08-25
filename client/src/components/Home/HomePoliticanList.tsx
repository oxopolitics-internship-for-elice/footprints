import React from 'react';
import { PoliticiansTypes } from '@/types/PoliticiansTypes';

import { Slide } from 'react-full-page';
import PoliticianAPI from '@/api/PoliticianAPI';

const HomePoliticianList = () => {
  const [politicians, setPoliticians] = React.useState<PoliticiansTypes | null>(
    null,
  );
  React.useEffect(() => {
    const fetchPoliticians = async () => {
      const { data } = await PoliticianAPI.getList();
      console.log(data);
    };
    fetchPoliticians();
  }, []);

  return (
    <>
      {/* {politicians
        ? politicians.map(politician => (
            <Slide>
              <HomePolitician name={politician.name} />
            </Slide>
          ))
        : null} */}
    </>
  );
};

export default HomePoliticianList;
