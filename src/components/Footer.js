export default function Footer() {
  const currentYear = new Date().getFullYear();

  // function logLocalStorage() {
  //   for (let i = 0; i < localStorage.length; i++) {
  //     const key = localStorage.key(i);
  //     const value = localStorage.getItem(key);

  //     if (!value.startsWith("{") && !value.startsWith("[")) {
  //       console.warn(`Skipping non-JSON item: ${key}`);
  //       continue;
  //     }

  //     try {
  //       const results = JSON.parse(localStorage.getItem(key));
  //       const size = new Blob([value]).size;
  //       const totalSize = Object.entries(localStorage).reduce(
  //         (acc, [k, v]) => acc + new Blob([v]).size,
  //         0
  //       );
  //       const storageLength = localStorage.length;

  //       console.log(`Query: ${key}, Results:`, results);
  //       console.log(`Size: ${size} bytes`);
  //       console.log(`Total Size: ${totalSize / 1000000} mb`);
  //       console.log("All Queries:", Object.keys(localStorage));
  //       console.log("Storage Length:", storageLength + "/10 allowed queries");
  //     } catch (e) {
  //       console.error(`Error parsing results for query: ${key}`, e);
  //     }
  //   }
  // }

  // const handleClick = () => {
  //   logLocalStorage();
  // };

  // const handleStorageClear = () => {
  //   if (!window.confirm("Are you sure you want to clear local storage?")) {
  //     return;
  //   }
  //   localStorage.clear();
  // };

  return (
    <div className="bg-gray-500 text-white text-center p-4 my-6 rounded">
      <hr className="my-4 border-t border-gray-300" />
      <p>&copy; {currentYear} BiteSized</p>
      <p>
        Data provided by <a href="https://spoonacular.com">Spoonacular</a>
      </p>
      <p>
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </p>
      <hr className="my-4 border-t border-gray-300" />
      {/* <p>For Testing</p> */}
      {/* <div className="flex mt-2 ">
        <button
          onClick={handleClick}
          className="button rounded-full outline outline-blue-500 bg-blue-300 px-3 py-2 m-auto block hover:bg-blue-400 scale-75 text-gray-800"
        >
          Log Local Storage
        </button>
        <button
          onClick={handleStorageClear}
          className="button rounded-full outline outline-blue-500 bg-blue-300 px-3 py-2 m-auto block hover:bg-blue-400 scale-75 text-gray-800"
        >
          Clear Local Storage
        </button>
      </div> */}
    </div>
  );
}
