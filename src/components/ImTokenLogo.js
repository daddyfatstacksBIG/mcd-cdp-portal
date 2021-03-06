import React from 'react';

const ImTokenLogo = () => {
  const unique = Math.random()
    .toString(36)
    .substring(2, 7);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      transform="scale(4)"
      viewBox="0 0 894 768"
    >
      <g transform="translate(0 2.938)">
        <linearGradient
          id={unique}
          x1="-229.262"
          x2="-230.629"
          y1="763.882"
          y2="762.525"
          gradientTransform="matrix(134.3987 0 0 -134.8504 31348.697 103302.031)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#11c4d1" />
          <stop offset="1" stopColor="#0062ad" />
        </linearGradient>
        <path
          fill={`url(#${unique})`}
          d="M541.5 416.1s0 19.8-2.1 28.3c-2.1 8.6-6.1 14.5-10.4 18.9-4.4 4.4-10.2 8.4-19 10.5-8.9 2.1-28.1 2-28.1 2h-69.8s-19.7 0-28.2-2.1c-8.5-2.2-14.5-6.1-18.9-10.5-4.4-4.4-8.4-10.2-10.4-19.1-2.1-8.9-2-28.1-2-28.1v-70s0-19.8 2.1-28.3c2.1-8.6 6.1-14.5 10.4-18.9 4.4-4.4 10.2-8.4 19-10.5 8.9-2.1 28.1-2 28.1-2H482s19.7 0 28.2 2.1c8.5 2.2 14.5 6.1 18.9 10.5s8.4 10.2 10.4 19.1 2 28.1 2 28.1v70z"
        />
        <path
          fill="#fff"
          d="M511.9 344.2c3.9 53.9-31.9 79.5-64 82.3-29.8 2.6-57.8-15-60.2-42.3-2-22.5 12.4-32.2 23.7-33.1 11.6-1 21.3 6.7 22.2 16.1.8 9-5 13.2-9.1 13.5-3.2.3-7.2-1.6-7.6-5.6-.3-3.5 1.1-3.9.7-7.6-.6-6.6-6.5-7.3-9.7-7-3.9.3-11 4.8-10.1 15.8 1 11.1 12 19.9 26.4 18.6 15.6-1.4 26.5-13.1 27.3-29.6 0-.9.2-1.7.6-2.5.2-.3.3-.6.6-.9.4-.6.8-1.1 1.3-1.6l1.4-1.4c6.8-6.2 31.4-21 54.5-16.4.2 0 .4.1.5.2.9 0 1.4.7 1.5 1.5"
        />
      </g>
    </svg>
  );
};

export default ImTokenLogo;
