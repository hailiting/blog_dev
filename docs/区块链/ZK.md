    function initialize() public initializer {
    function addAdmin(address account) external {
    function removeAdmin(address account) external {
    function addTransferer(address account) external {
    function removeTransferer(address account) external {
    function initialize(
    function join(bytes memory zkCard) external override nonReentrant {
    function leave() external override nonReentrant {
    function start() external override nonReentrant {
    function selectNumber(
    function bingo(
    function selectAndBingo(
        version; // avoid warning this function is pure
    function _startGame(Lineup[] memory joiners) internal returns (uint256 gameId) {
    function setReward(
    function setGameTimers(
     * @dev Call this function by callStatic to check if a game is ongoing and
    function restoreGame(
    function reveal(
    function _getGameContract(
    function mint(
    function editUnplayedCard(
    function bindCardGame(
