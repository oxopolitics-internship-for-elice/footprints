import React, { useEffect, useCallback, useState } from 'react';
import api from '@src/api/api';
import { standbyIssueState } from '@src/store/StandbyIssueState';
import { useRecoilState } from 'recoil';

function RenderIssue({ issueList }: { issueList: object[] }) {
  return issueList.map((issue) => {
    return (
      <article key={issue._id}>
        <div>{issue.issueDate}</div>
        <div>{issue.content}</div>
        <button>찬성</button>
        <button>반대</button>
      </article>
    );
  });
}

export default RenderIssue;
