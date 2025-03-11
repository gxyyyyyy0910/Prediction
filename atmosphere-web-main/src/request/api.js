import {get} from "@/request/http";

export const getTimeline = p => get('/getTimeline/',p);

export const getWind = p => get('/getWind/',p);

export const getProvinceGauge = p => get('/getProvinceGauge/',p);

export const getCityGauge = p => get('/getCityGauge/', p);

export const getProvincePollutedParallel = p => get('/getProvincePollutedParallel/', p);

export const getCityPollutedParallel = p => get('/getCityPollutedParallel/', p);

export const getProvinceMap = p => get('/getProvinceMap/',p);

export const getCityMap = p => get('/getCityMap/',p);

export const getTwoParamsRelationship = p => get('/getTwoParamsRelationship',p);

export const getPrediction = p => get('/getPrediction',p);
export const getProvinceTempa = p => get('/getProvinceTempa',p);
export const getCityTempa = p => get('/getCityTempa',p);
