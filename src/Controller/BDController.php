<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BDController extends AbstractController
{
    /**
     * @Route("/BD", name="b_d")
     */
    public function index()
    {
        return $this->render('bd/index.html.twig', [
            'controller_name' => 'BDController',
        ]);
    }
}
