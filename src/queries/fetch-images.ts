async function getData() {
  const url = "https://picsum.photos/v2/list";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error.message);
  }
}

export { getData };