const breakpoints = [640, 768, 1024, 1280];

const mq = breakpoints.map((bp) => `@media screen and (min-width: ${bp}px)`);

export default mq;
