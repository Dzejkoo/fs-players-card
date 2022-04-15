import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { LastMatch } from '../../moleculas/LastMatch/LastMatch';
import { RestMatch } from '../../moleculas/RestMatch/RestMatch';

const dataMock = [
  {
    homeTeam: {
      team_name: 'Crystal Palace',
    },
    event_date: '2022-03-19T12:30:00+00:00',
    goalsAwayTeam: 1,
    goalsHomeTeam: 0,
    awayTeam: {
      team_name: 'Arsenal',
    },
    venue: 'Villa Parkt',
  },
  {
    homeTeam: {
      team_name: 'Crystal Palace',
    },
    event_date: '2022-03-19T12:30:00+00:00',
    goalsAwayTeam: 0,
    goalsHomeTeam: 3,
    awayTeam: {
      team_name: 'Arsenal',
    },
    venue: 'Villa Parkt',
  },
];

const initialState = {
  loading: true,
  error: null,
  articles: {},
};

const ACTION = {
  CALL_API: 'call-api',
  SUCCESS: 'success',
  ERROR: 'error',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.CALL_API: {
      return {
        ...state,
        loading: true,
      };
    }
    case ACTION.SUCCESS: {
      return {
        ...state,
        loading: false,
        articles: action.data,
      };
    }
    case ACTION.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export const Matches = () => {
  const [state, dispath] = useReducer(reducer, initialState);
  const {
    loading,
    error,
    articles: { api },
  } = state;

  useEffect(() => {
    dispath({ type: ACTION.CALL_API });
    fetch('https://v2.api-football.com/fixtures/team/42/last/20', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6ea31e09a7123bebeae57afc5ef0651e',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        dispath({ type: ACTION.SUCCESS, data: response });
      })
      .catch((error) => dispath({ type: ACTION.ERROR, error: error }));
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <p>loading...</p>
      ) : (
        api.fixtures.map((queue, index) => {
          if (index === 0) {
            return <LastMatch key={index} data={queue} />;
          } else {
            return <RestMatch key={index} data={queue} />;
          }
        })
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  flex-wrap: wrap;
  &.slide-enter {
    opacity: 0;
  }
  &.slide-enter-active {
    opacity: 1;
    transition: opacity 350ms ease-in-out;
  }
  &.slide-exit {
    opacity: 0;
  }
  &.slide-exit-active {
    opacity: 0;
    transition: opacity 350ms ease-in-out;
  }
`;
