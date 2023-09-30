import React, { useState } from "react";


export type StateModel<T> = [T, React.Dispatch<React.SetStateAction<T>>]
