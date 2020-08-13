<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AnnexeController extends AbstractController
{
    /**
     * @Route("/Mentions", name="mentions")
     */
    public function mentions()
    {
        return $this->render('annexe/mentions.html.twig', [
            'controller_name' => 'AnnexeController',
        ]);
    }
     /**
     * @Route("/confi", name="confi")
     */
    public function confi()
    {
        return $this->render('annexe/confi.html.twig', [
            'controller_name' => 'AnnexeController',
        ]);
    }
}
