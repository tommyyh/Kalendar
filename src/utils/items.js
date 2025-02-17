// Check if date is in between start and end date
const converToDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

export const isDateBetween = (year, month, day, segments, style) => {
  if (!segments || segments.length === 0) return false;

  const date = fullDateConstructor(year, month, day);
  const dateString = converToDate(date);

  // Use find to get the first segment that matches the date
  const matchingSegment = segments.find((segment) => {
    if (!segment.start || !segment.end) return false;

    const startString = converToDate(segment.start);
    const endString = converToDate(segment.end);

    return dateString >= startString && dateString <= endString;
  });

  // If a matching segment is found, return its status class
  if (matchingSegment) return getStatusClass(matchingSegment.status, style);

  return false;
};

// Recursive function -> delete an item and all its descendants
export const deleteCascade = (code, items) => {
  // Find all direct children of parent
  const children = items.filter((item) => item.parent === code);

  // Recursively delete descendants
  children.forEach((child) => {
    items = deleteCascade(child.code, items);
  });

  // Remove the parent
  return items.filter((item) => item.code !== code);
};

// Toggle show true/false -> cascade
export const toggleShow = (code, items, newShowValue) => {
  // Find direct children
  const children = items.filter((item) => item.parent === code);

  // Update all descendants - recursion
  children.forEach((child) => {
    items = toggleShow(child.code, items, newShowValue);
  });

  // Update the children
  return items.map((item) =>
    item.parent === code ? { ...item, show: newShowValue } : item
  );
};

// Get classname from status
export const getStatusClass = (status, style) => {
  switch (status) {
    case 'ongoing':
      return style.activeOngoing;
    case 'unfinished':
      return style.activeUnfinished;
    case 'finished':
      return style.activeFinished;
    default:
      return style.activeOngoing;
  }
};

// Construct full date from day. If day is from next month - convert
export const fullDateConstructor = (year, month, day) => {
  const fullMonth = month >= 10 ? month : `0${month}`; // Check if month is 2 digits
  let date = `${year}-${fullMonth}-${day.date}`;

  if (day.fullDate) date = day.fullDate;

  return date;
};

// Group
export const groupSegments = (segments) => {
  if (!segments || segments.length === 0) return [];

  const groups = [];

  // Sort segments by start date
  segments.sort((a, b) => new Date(a.start) - new Date(b.start));
  // Place segments in groups
  segments.forEach((segment) => {
    let placed = false;

    // Try to place in existing group
    for (const group of groups) {
      // If found -> place in group
      if (!group.some((s) => isOverlapping(s, segment))) {
        group.push(segment);
        placed = true;

        break;
      }
    }

    // If segment overlaps with everything -> create a new group
    if (!placed) {
      groups.push([segment]);
    }
  });

  return groups;
};

// Check if two segments overlap
const isOverlapping = (segment1, segment2) => {
  const start1 = new Date(segment1.start);
  const end1 = new Date(segment1.end);
  const start2 = new Date(segment2.start);
  const end2 = new Date(segment2.end);

  return start1 <= end2 && start2 <= end1;
};

// Remove segment
export const removeSegment = (segmentId, items) => {
  const segmentItemIndex = items.findIndex((item) =>
    item.segments?.some((segment) => segment.id === segmentId)
  );

  if (segmentItemIndex === -1) return items; // If segment not found -> return original array

  // Remove segment if index matches
  return items.map((item, index) =>
    index === segmentItemIndex
      ? {
          ...item,
          segments: item.segments.filter((segment) => segment.id !== segmentId),
        }
      : item
  );
};
