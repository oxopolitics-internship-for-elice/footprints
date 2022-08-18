import RenderIssue from './RenderIssue';
import React, { useEffect, useCallback, useState } from 'react';
import api from '@src/api/api';
import { standbyIssueState } from '@src/store/StandbyIssueState';
import { useRecoilState } from 'recoil';

function StandbyIssue() {
  const [issueList, setIssueList] = useRecoilState(standbyIssueState);
  useEffect(() => {
    api<Object[]>('/IssueMockData.json').then((data) => setIssueList(data));
  }, []);

  return (
    <>
      <RenderIssue issueList={issueList} />
    </>
  );
}

export default StandbyIssue;
