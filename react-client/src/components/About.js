import React from 'react'

export default function About() {
    return (
        <section class="about-section text-center" id="about">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8">
                        <h2 class="text-white mb-4">Built with some knowledge</h2>
                        <p class="text-white-50" style={{fontStyle:"italic",wordSpacing:"0.25rem"}}>
                            This is a mini project which gave me a hands on experience with React.js, WEB sockets, Express.js and Node.js. This comes with a three different approches of how a user can play Tic Tac Toe Game. It Comes with a offline game, a multiuser online game, a computer based on random function.
                            You can check out the respective source code in my  <a href="https://github.com/Srihari2222/Tic-Tac-Toe-only-with-react-" rel="noreferrer" target="_blank"> GIT HUB</a> repository.
                            For any queries  <a href="https://katare-srihari.netlify.app/" rel='noreferrer' target='_blank'>Contact me</a>
                        </p>
                    </div>
                </div>
                <img class="img-fluid" src={require('./images/tic_tac_toe.jpg')} alt="..." />
            </div>
        </section>
    )
}
