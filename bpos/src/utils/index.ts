import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export function isEmptyObject(obj: any): boolean {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function getPercentage(numerator: number, denominator: number): number {
  let ret = 0;
  if (denominator > 0) {
    ret = Math.floor((numerator / denominator) * 10000) / 100;
  }
  return ret;
}

export function formatDate(timestamp: number) {
  return dayjs(timestamp * 1000).format("MMMM Do YYYY");
}

export function getRemainingTimeString(remainingBlockCount: number): string {
  let ret = "";
  if (remainingBlockCount >= 720 * 2) {
    //more 2 days
    ret = ` ${Math.floor(remainingBlockCount / 720)} Days`;
  } else if (remainingBlockCount > 720) {
    ret = ` 1 Day ${Math.floor((remainingBlockCount % 720) / 30)} Hours`;
  } else if (remainingBlockCount == 720) {
    ret = " 1 Day";
  } else if (remainingBlockCount > 60) {
    ret = ` ${Math.floor(remainingBlockCount / 30)} Hours`;
  } else if (remainingBlockCount > 30) {
    ret = ` ${Math.floor(remainingBlockCount / 30)} Hours ${
      Math.floor(remainingBlockCount % 30) * 2
    } Minutes`;
  } else if (remainingBlockCount == 30) {
    ret = " 1 Hours";
  } else {
    ret = ` ${remainingBlockCount * 2} Minutes`;
  }
  return ret;
}

export function showIntegerPart(value: number) {
  return Math.ceil(value);
}
