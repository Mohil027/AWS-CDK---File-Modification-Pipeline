import FormPage from "./Components/FormPage";
import React from "react";


function App() {
  return (
    <div className="flex flex-col items-center justify-center py-4 h-screen">
        <p class="text-4xl text-gray-900 dark:text-white">Fovus Coding Challenge</p>
        <FormPage/>
        <footer class="bg-white rounded-lg shadow mx-10 mb-10 dark:bg-gray-800 w-full md:w-3/4">
            <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
              <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Submitted By <a href="https://www.linkedin.com/in/mohil-khimani-77510716a/" target="_blank" class="hover:underline text-gray-900">Mohil Khimani</a>
            </span>
            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="https://www.linkedin.com/in/mohil-khimani-77510716a/" target="_blank"  class="hover:underline me-4 md:me-6">Linkedin</a>
                </li>
                <li>
                    <a href="https://github.com/Mohil027/" target="_blank" class="hover:underline me-4 md:me-6">Github</a>
                </li>
                <li>
                    <a href="tel:4803225093" class="hover:underline me-4 md:me-6">Phone</a>
                </li>
                <li>
                    <a href="mailto:mkhimani@asu.edu" class="hover:underline">Email</a>
                </li>
            </ul>
            </div>
        </footer>
    </div>
  );
}

export default App;
