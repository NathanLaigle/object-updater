/**
 * Creates a copy of the given object and modifies the property at the specified path with the given new value.
 * If the path does not exist, the necessary properties and array indices are created.
 *
 * @param obj The object to copy and modify.
 * @param propertyPath The path of the property to modify, specified as a string in the form "prop1.prop2[2].prop3".
 * @param newValue The new value to set for the property.
 * @returns A copy of the object with the modified property.
 */
export function update<T = any, D = any>(params: {
  obj: T;
  propertyPath: string;
  newValue: D;
}): T {
  const { newValue, obj, propertyPath } = params;

  // Use JSON.parse() and JSON.stringify() to create a copy of the object
  let copy = JSON.parse(JSON.stringify(obj));

  // Use split() to separate the property path into an array of strings
  let pathElements = propertyPath.split('.');

  // Initialize a pointer to the target object to modify
  let target = copy;

  // Iterate through each element of the property path
  for (let i = 0; i < pathElements.length; i++) {
    let pathElement = pathElements[i];

    // If the path element is an array (indicated by the use of brackets), extract the array index
    let arrayIndex = null;
    if (pathElement.endsWith(']')) {
      let arrayIndexMatch = pathElement.match(/\[(\d+)\]$/);
      if (arrayIndexMatch) {
        arrayIndex = parseInt(arrayIndexMatch[1]);
        pathElement = pathElement.replace(/\[\d+\]$/, '');
      }
    }

    // If this is the last element of the path, modify the property value
    if (i === pathElements.length - 1) {
      if (arrayIndex !== null) {
        // If the element is an array, check that the index exists and modify the element at that index
        if (!target[pathElement]) {
          target[pathElement] = [];
        }
        if (!target[pathElement][arrayIndex]) {
          target[pathElement][arrayIndex] = {};
        }
        target[pathElement][arrayIndex] = newValue;
      } else {
        // If it's a normal object, check that the property exists and modify its value
        if (!target[pathElement]) {
          target[pathElement] = {};
        }
        target[pathElement] = newValue;
      }
    } else {
      // If it's not the last element of the path, advance the pointer to the child object
      if (arrayIndex !== null) {
        // If the element is an array, check that the index exists and advance the pointer to the element of the array at that index
        if (!target[pathElement]) {
          target[pathElement] = [];
        }
        if (!target[pathElement][arrayIndex]) {
          target[pathElement][arrayIndex] = {};
        }
        target = target[pathElement][arrayIndex];
      } else {
        // If it's a normal object, check that the property exists and advance the pointer to the child object
        if (!target[pathElement]) {
          target[pathElement] = {};
        }
        target = target[pathElement];
      }
    }
  }

  return copy;
}

/**
 * Creates a copy of the given object and delete the property at the specified path.
 * If the path does not exist, the necessary properties and array indices are created.
 *
 * @param obj The object to copy and modify.
 * @param propertyPath The path of the property to delete, specified as a string in the form "prop1.prop2[2].prop3".
 * @returns A copy of the object with the modified property.
 */
export function remove<T = any>(params: { obj: T; propertyPath: string }): T {
  const { obj, propertyPath } = params;

  // Use JSON.parse() and JSON.stringify() to create a copy of the object
  let copy = JSON.parse(JSON.stringify(obj));

  // Use split() to separate the property path into an array of strings
  let pathElements = propertyPath.split('.');

  // Initialize a pointer to the target object to modify
  let target = copy;

  // Iterate through each element of the property path
  for (let i = 0; i < pathElements.length; i++) {
    let pathElement = pathElements[i];

    // If the path element is an array (indicated by the use of brackets), extract the array index
    let arrayIndex = null;
    if (pathElement.endsWith(']')) {
      let arrayIndexMatch = pathElement.match(/\[(\d+)\]$/);
      if (arrayIndexMatch) {
        arrayIndex = parseInt(arrayIndexMatch[1]);
        pathElement = pathElement.replace(/\[\d+\]$/, '');
      }
    }

    // If this is the last element of the path, modify the property value
    if (i === pathElements.length - 1) {
      if (arrayIndex !== null) {
        // If the element is an array, check that the index exists and delete the element at that index
        if (!target[pathElement]) {
          target[pathElement] = [];
        }
        if (!target[pathElement][arrayIndex]) {
          target[pathElement][arrayIndex] = {};
        }
        (target[pathElement] as unknown[]).splice(arrayIndex, 1);
      } else {
        // If it's a normal object, check that the property exists and delete its value
        if (!target[pathElement]) {
          target[pathElement] = {};
        }
        delete target[pathElement];
      }
    } else {
      // If it's not the last element of the path, advance the pointer to the child object
      if (arrayIndex !== null) {
        // If the element is an array, check that the index exists and advance the pointer to the element of the array at that index
        if (!target[pathElement]) {
          target[pathElement] = [];
        }
        if (!target[pathElement][arrayIndex]) {
          target[pathElement][arrayIndex] = {};
        }
        target = target[pathElement][arrayIndex];
      } else {
        // If it's a normal object, check that the property exists and advance the pointer to the child object
        if (!target[pathElement]) {
          target[pathElement] = {};
        }
        target = target[pathElement];
      }
    }
  }

  return copy;
}
