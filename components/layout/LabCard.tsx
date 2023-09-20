import Card from './Card';

const LabCard = () => (
  <Card>
    <>
      <h2 className='pb-4'>Lab Access</h2>
      <h3 className='pb-4 text-sm text-gray-400'>
        We now use Tailscale for accessing the lab. Linux users can install with this one-liner. 
      </h3>
      <h3 class="pb-4 text-sm text-gray-400 hover:underline hover:text-gray-300">
        <a href="https://forums.techhaven.io/t/access-labs-via-tailscale/316" target="_blank" rel="noopener noreferrer">
        Visit forums for more info.
        </a>
      </h3>
      <div>
        <code class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-4 pl-6 mx-4">
        <span class="flex gap-4">
          <span class="shrink-0 text-gray-500">
            $
          </span>
          
          <span class="flex-1">
            <span>curl -fsSL https://raw.githubusercontent.com/Tech-Haven/tailscale-install/master/install.sh | sudo sh</span>
          </span>
        </span>
      </code>
        <h5 class="text-right mx-4 text-gray-400 hover:underline hover:text-gray-300"><a href="https://raw.githubusercontent.com/Tech-Haven/tailscale-install/master/install.sh" target="_blank" rel="noopener noreferrer">View source</a></h5>
      </div>
    </>
  </Card>
);

const DownloadVPNButton = () => {
  return (
    <a
      href={`/api/wg`}
      className='inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-gray-100 border border-gray-300 rounded-lg  hover:border-gray-200 focus:ring-4 focus:ring-gray-200'
    >
      Download VPN
    </a>
  );
};

export default LabCard;
