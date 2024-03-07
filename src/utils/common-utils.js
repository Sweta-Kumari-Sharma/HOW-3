export const addEllipses=(string, limit)=>{
    return string.length > limit? string.substr(0,limit)+'..':string;
};