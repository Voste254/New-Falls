function Addpost() {
  return (
    <div className="flex-1 h-full overflow-y-auto pt-[80px] bg-purple-200 p-4 flex justify-center">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-center text-purple-700">Add a Product</h2>

        <div>
          <label htmlFor="productName" className="block text-gray-700 font-medium mb-1">
            Product name:
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Product name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label htmlFor="productDescription" className="block text-gray-700 font-medium mb-1">
            Product description:
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            placeholder="Product description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows={4}
          ></textarea>
        </div>

        <div>
          <label htmlFor="productPrice" className="block text-gray-700 font-medium mb-1">
            Product Price:
          </label>
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            placeholder="Product price..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label htmlFor="fileUpload" className="block text-gray-700 font-medium mb-1">
            Upload a file:
          </label>
          <input
            type="file"
            id="fileUpload"
            name="file"
            className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-100 file:text-purple-700
              hover:file:bg-purple-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Addpost;
