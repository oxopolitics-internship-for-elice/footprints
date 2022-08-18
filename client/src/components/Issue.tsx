import React, { useEffect, useCallback, useState } from 'react';
import api from '../api/api';

function Issue() {
  api<Object[]>('/IssueMockData.json').then((data) => console.log(data));

  return (
    <article>
      <div>2022년 0월 00일</div>
      <div>윤석열 대통령 당선</div>
      <button>찬성</button>
      <button>반대</button>
    </article>
  );
}

export default Issue;
