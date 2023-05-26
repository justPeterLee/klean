/* --------------------------------------------------------------------
strings & numbers (name, price, description)
--------------------------------------------------------------------*/
interface sendStringParams {
  data: string | number;
  chainFunc: (params: string | number) => void;
}
export function sendString(params: sendStringParams) {
  params.chainFunc(params.data);
}

/* --------------------------------------------------------------------
arrays (points)
--------------------------------------------------------------------*/
interface sendArrParams {
  data: string[];
  chainFunc: (params: string[]) => void;
}

export function sendArr(params: sendArrParams) {
  params.chainFunc(params.data);
}

/* --------------------------------------------------------------------
selection
--------------------------------------------------------------------*/
type selectionType = {
  selection: string;
  options: string[];
  skuValue?: string;
}[];

interface sendSelectionParams {
  data: selectionType;
  chainFunc: (params: selectionType) => void;
}

export function sendSelection(params: sendSelectionParams) {
  params.chainFunc(params.data);
}

/* --------------------------------------------------------------------
images
--------------------------------------------------------------------*/
type imageInfoType = {
  images: string[];
  description: string;
};

type imageType = {
  thumbnail: imageInfoType;
  productImage: imageInfoType;
  feature?: imageInfoType;
};

interface sendImageParams {
  data: imageType;
  chainFunc: (params: imageType) => void;
}

export function sendImage(params: sendImageParams) {
  params.chainFunc(params.data);
}

/* --------------------------------------------------------------------
read send data 
--------------------------------------------------------------------*/

export function readName(params: string) {
  return params;
}

export function readPrice(params: number) {
  return params;
}

export function readDescription(params: string) {
  return params;
}

export function readSelection(params: selectionType) {
  return params;
}

export function readImage(params: imageType) {
  return params;
}
