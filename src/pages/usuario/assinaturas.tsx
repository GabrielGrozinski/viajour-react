export default function Assinaturas() {
return (
    <main
      className="shadow-[0_30px_30px_-25px_rgba(0,38,255,0.205)] bg-white text-[#697e91] max-w-[300px] rounded-2xl"
    >

      <div style={{padding: 20, paddingTop: 40}} className="items-center bg-[#ecf0ff] relative rounded-xl">
        
        {/* Pricing */}
        <span style={{padding: 8}} className="absolute bg-[#bed6fb] flex items-center text-xl font-semibold text-[#425475] px-[0.75em] rounded-[99em_0_0_99em] right-0 top-0">
          <span>
            $49 <small className="text-[#707a91] text-[0.75em]">/ m</small>
          </span>
        </span>

        {/* Title */}
        <p className="font-semibold text-xl text-[#425675]">Professional</p>

        {/* Info */}
        <p>
          This plan is for those who have a team already and running a large business.
        </p>

        {/* Features */}
        <ul className="flex flex-col">
          
          {/* Item 1 */}
          <li className="flex items-center gap-2">
            <span className="bg-[#1FCAC5] inline-flex items-center justify-center text-white w-5 h-5 rounded-full">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  fill="currentColor"
                  d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                ></path>
              </svg>
            </span>
            <span>
              <strong className="font-semibold text-[#425275]">20</strong> team members
            </span>
          </li>

          {/* Item 2 */}
          <li className="flex items-center gap-2">
            <span className="bg-[#1FCAC5] inline-flex items-center justify-center text-white w-5 h-5 rounded-full">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  fill="currentColor"
                  d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                ></path>
              </svg>
            </span>
            <span>
              Plan <strong className="font-semibold text-[#425275]">team meetings</strong>
            </span>
          </li>

          {/* Item 3 */}
          <li className="flex items-center gap-2">
            <span className="bg-[#1FCAC5] inline-flex items-center justify-center text-white w-5 h-5 rounded-full">
              <svg
                height="24"
                width="24"
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  fill="currentColor"
                  d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                ></path>
              </svg>
            </span>
            <span>File sharing</span>
          </li>
        </ul>

        {/* Button */}
        <div style={{marginTop: 20}} className="w-full flex items-center justify-end">
          <a
            href="#"
            className="bg-[#6558d3] text-white font-medium text-lg text-center w-full no-underline px-[0.75em] rounded-md border-0 outline-0 hover:bg-[#4133B7] focus:bg-[#4133B7]"
          >
            Choose plan
          </a>
        </div>
      </div>

    </main>
  );
}