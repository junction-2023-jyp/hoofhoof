import { EmailCountEquivalent, emailCountEquivalentDataMap } from '../../libs/emailCountEquivalent';

type EmailCountDataMap = {
  [key: string]: EmailCountEquivalent;
};

const findClosestValue = (data: EmailCountDataMap, targetCount: number): EmailCountEquivalent | undefined => {
  let closestKey: string | null = null;
  let smallestDifference: number = Infinity;

  Object.keys(data).forEach(key => {
    const difference = Math.abs(targetCount - data[key].count);
    if (difference < smallestDifference) {
      smallestDifference = difference;
      closestKey = key;
    }
  });

  return closestKey ? data[closestKey] : undefined;
};

export const getCarbonRelatedData = (deletedMail: number) => {
  const emailEquivalentData = findClosestValue(emailCountEquivalentDataMap, deletedMail);
  return emailEquivalentData;
};
