const aDayHours = 24;
const aWeekInHours = aDayHours * 7;

const AppConfig = {
  reviewsHours: [
    0,
    1,
    aDayHours,
    aWeekInHours,
    aWeekInHours * 2,
    aWeekInHours * 4
  ],
  lastReview: 6
};

export default AppConfig;
